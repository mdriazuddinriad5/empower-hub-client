import { Grid } from "@mui/material";
import SectionTitle from "../shared/SectionTitle/SectionTitle";
import ServiceCard from "./ServiceCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const Services = () => {
    const axiosPublic = useAxiosPublic();

    const { data: services = [] } = useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            const res = await axiosPublic.get('/services');
            return res.data;
        }
    })

    return (
        <Grid my={2} maxWidth={'lg'} sx={{ mx: { lg: 'auto' } }}>
            <SectionTitle heading={'Services'} subHeading={'Empowering Your Workplace'}></SectionTitle>
            <Grid container justifyContent={'center'} spacing={3}>
                {
                    services.map((service, i) => (

                        <Grid key={i} item xs={12} sm={6} md={4}>
                            <ServiceCard service={service}></ServiceCard>
                        </Grid>

                    ))
                }
            </Grid>
        </Grid >
    );
};

export default Services;