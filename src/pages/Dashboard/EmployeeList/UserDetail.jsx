import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Grid, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LabelList } from 'recharts';
import moment from "moment";

const UserDetail = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: details = {} } = useQuery({
        queryKey: ['detail'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${id}`);
            return res.data;
        }
    });

    const { name, designation, image } = details;

    const { data: payments = [] } = useQuery({
        queryKey: ['payment'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment?employeeId=${id}`);
            return res.data;
        }
    });

    return (
        <Grid>
            <Grid container direction="column" alignItems="center" sx={{ marginTop: 2 }}>
                <Avatar
                    alt={name}
                    src={image}
                    sx={{
                        width: (theme) => theme.spacing(13),
                        height: (theme) => theme.spacing(13),
                        margin: (theme) => theme.spacing(2),
                    }}
                />
                <Typography variant="h5">{name}</Typography>
                <Typography variant="subtitle1">{designation}</Typography>
            </Grid>

            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={payments}>
                    <XAxis
                        dataKey="date"  // Make sure this corresponds to the property in your payments data
                        stroke="#333338"
                        tickFormatter={(timestamp) => moment(parseInt(timestamp, 10)).format('YYYY-MM')}
                    />
                    <YAxis
                        tickFormatter={(value) => `$${value}`} // Add $ sign to the y-axis labels
                    />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Bar dataKey="salary" fill="#140F67" barSize={30}>
                        <LabelList
                            dataKey="salary"
                            position="top"
                            formatter={(value) => `$${value}`} // Add $ sign to the label on top of each bar
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Grid>
    );
};

export default UserDetail;
