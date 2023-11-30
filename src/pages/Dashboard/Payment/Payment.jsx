import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Grid } from "@mui/material";
import SectionTitle from "../../../Components/shared/SectionTitle/SectionTitle";
import CheckoutForm from "./CheckoutForm";

const Payment = ({ employeeId, month, onClose }) => {

    //TODO: add publishable key
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
    console.log(stripePromise);
    return (
        <Grid>
            <SectionTitle heading={"Monthly Salary"} subHeading={"Pay through Card"}></SectionTitle>
            <Grid>
                <Elements stripe={stripePromise}>
                    <CheckoutForm employeeId={employeeId} month={month} onClose={onClose}></CheckoutForm>
                </Elements>
            </Grid>
        </Grid>
    );
};

export default Payment;