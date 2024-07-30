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
        "https://api.wbpms.in/api/EVNT_MGMNT/DesigLevel",
        
        // { headers: { deadlock: "Dev!l$k!tchen" } }
      );
      return response.data;
    },
  });

  return <></>;
};

export default Tanstack;
