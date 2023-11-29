import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useHr = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();
    const { data: isHr, isPending: isHrLoading } = useQuery({
        queryKey: [user?.email, 'isHr'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/hr/${user.email}`);
            // console.log(res.data);
            return res.data?.hr;
        }
    })

    return [isHr, isHrLoading]
};

export default useHr;