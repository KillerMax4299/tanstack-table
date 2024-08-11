import { useState, useEffect } from "react";
import {
  useQuery,
  useQueryClient,
  useMutation,
  useQueries,
} from "@tanstack/react-query";
import axios from "axios";

const Tanstack = () => {
  const { data } = useQuery({
    queryKey: "users",
    queryFn: async () => {
      const response = await axios.get(
        "http://localhost:4000"

        // { headers: { deadlock: "Dev!l$k!tchen" } }
      );
      return response.data;
    },
  });

  return <>{data}</>;
};

export default Tanstack;
