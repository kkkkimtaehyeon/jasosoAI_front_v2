import {useEffect, useState} from "react";
import api from "../common/api-axios.js";

const useMyCoverLetters = () => {
    const [myCoverLetters, setMyCoverLetters] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        api.get("/my-cover-letters")
            .then(res => {
                const processed = res.data.map(cl => ({
                    ...cl,
                    date: new Date(cl.created_at).toISOString().split("T")[0],
                }));
                setMyCoverLetters(processed);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch cover letters:", err);
                setLoading(false);
            });
    }, []);

    return {myCoverLetters, loading}
}

export default useMyCoverLetters;