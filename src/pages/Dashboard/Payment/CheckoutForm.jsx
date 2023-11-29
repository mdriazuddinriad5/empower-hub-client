import { Button, Typography } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";


const CheckoutForm = ({ employeeId, month, onClose }) => {
    const [transactionId, setTransactionId] = useState();
    const [clientSecret, setClientSecret] = useState();
    const [error, setError] = useState();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // const amount = 5;


    const { data: details = {} } = useQuery({
        queryKey: ['detail'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${employeeId}`);
            return res.data;
        }
    })

    const amount = details?.salary;



    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { salary: amount })
            .then(res => {
                console.log(res.data);
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosSecure, amount])

    console.log(clientSecret);



    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('');
        }


        // confirm payment

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log("confirm error");
        } else {
            console.log("Payment intend", paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                setTransactionId(paymentIntent.id);

                const payment = {
                    email: user.email,
                    price: amount,
                    transactionId: paymentIntent.id,
                    date: new Date(),  //utc date convert, use moment js to convert
                    status: 'pending'
                }
                const res = await axiosSecure.post('/payments', payment);
                console.log("Payment saved", res.data);
                // if (res.data.paymentResult.insertedId) {
                //     Swal.fire({
                //         position: "top-end",
                //         icon: "success",
                //         title: `${totalPrice} dollar paid successfully`,
                //         showConfirmButton: false,
                //         timer: 1500
                //     });
                //     navigate('/dashboard/paymentHistory')
                // }
                // refetch();

            }
        }

    }





    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="small"
                    type="submit"
                    disabled={!stripe || !clientSecret}
                    sx={{ mt: 2 }}
                >
                    Pay
                </Button>

                <Typography color="error" variant="subtitle2" sx={{ mt: 1 }}>
                    {error}
                </Typography>

                {transactionId && (
                    <Typography color="success" variant="subtitle2" sx={{ mt: 1 }}>
                        Transaction Id: {transactionId}
                    </Typography>
                )}
            </form>
        </div>
    );
};

export default CheckoutForm;