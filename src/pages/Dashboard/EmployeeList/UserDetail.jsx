import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const UserDetail = () => {
    const { id } = useParams();
    console.log(id);
    const axiosSecure = useAxiosSecure();

    const { data: details = {} } = useQuery({
        queryKey: ['detail'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/${id}`);
            return res.data;
        }
    })

    const { name, designation, image } = details;

    const { data: payments = [] } = useQuery({
        queryKey: ['payment'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?employeeId=${id}`);
            return res.data;
        }
    })

    console.log(payments);


    return (
        <div>
            User
        </div>
    );
};

export default UserDetail;