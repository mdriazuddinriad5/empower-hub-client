import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { Button, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const stripe = useStripe();
    const elements = useElements();

    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const amount = user?.salary;     //TODO: to change

    // const navigate = useNavigate();

    // const { data: employee = {} } = useQuery({
    //     queryKey: 'amount',
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`/user/${employeeId}`);
    //         return res.data;
    //     }
    // })

    // const amount= employee?.salary;

    // useEffect(() => {
    //     if (amount > 0) {
    //         axiosSecure.post('/create-payment-intent', { salary: amount })
    //             .then(res => {
    //                 console.log(res.data.clientSecret);
    //                 setClientSecret(res.data.clientSecret)
    //             })
    //     }
    // }, [axiosSecure, amount])


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            console.log('[paymentMethod]', paymentMethod);
            setError('')
        }

       
        
        // confirm card payment

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'anonymous',
                        name: user?.displayName || 'anonymous'
                    }
                }
            }
        )

       

        if (confirmError) {
            console.log("confirm error");
        } else {
            console.log("payment intent", paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log("Transaction id", paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // now save the payment in the database
                const payment = {
                    email: user.email,
                    salary: amount,
                    transactionId: paymentIntent.id,
                    date: new Date(),  //utc date convert, use moment js to convert
                }

                const res = await axiosSecure.post('/payments', payment);
                console.log("Payment saved", res.data);
                if (res.data.paymentResult.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${amount} dollar paid successfully`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // navigate('/dashboard/paymentHistory')
                }


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
                   /*  disabled={!stripe || !clientSecret} */
                    sx={{ mt: 2 }} // Add margin-top for spacing
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