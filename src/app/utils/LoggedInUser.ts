import { supabase } from "../../../utils/supabase/config";

interface Session {
  user: User | null;
}

export interface User {
  id: string;
  email: string;
  phone?: string;
}

interface SetUserData {
  (user: User): void;
}

  export async function fetchDoctorData(id: string, patentInfo: any) {
      try {
        const { data, error } = await supabase
          .from("doctors")
          .select(`*`)
          .eq("auth_id", id);
        if (error) {
          console.error("Error fetching patient data:", error);
          return;
        }
        patentInfo(data);
      } catch (error) {
        console.error("Error while fetching data:", error);
        return;
      }
    }

   export  async function getUserImageUrl(storageName: string,userId:any, imageUrlState:any) {
      const { data, error } = await supabase
      .storage
      .from(storageName)
      .list(userId + '/', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      });

      if (error) {
        return
      } else {
        imageUrlState(data[0]);
      }
    }