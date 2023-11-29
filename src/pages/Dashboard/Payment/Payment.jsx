import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Grid } from "@mui/material";
import SectionTitle from "../../../Components/shared/SectionTitle/SectionTitle";
import CheckoutForm from "./CheckoutForm";

const Payment = ({ employeeId, month, year }) => {

    //TODO: add publishable key
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
    return (
        <Grid>
            <SectionTitle heading={"Payment"} subHeading={"Please pay to eat"}></SectionTitle>
            <Grid>
                <Elements stripe={stripePromise}>
                    {/* <CheckoutForm employeeId={employeeId} month={month} year={year}></CheckoutForm> */}
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </Grid>
        </Grid>
    );
};

export default Payment;