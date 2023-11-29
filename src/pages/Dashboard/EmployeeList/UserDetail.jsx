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

    console.log(details);
    return (
        <div>
            User
        </div>
    );
};

export default UserDetail;