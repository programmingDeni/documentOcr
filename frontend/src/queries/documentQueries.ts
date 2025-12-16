import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../shared/constants/api";
import type { Document } from "../shared/types/Document";
import type { OcrMethod } from "@/shared/types/OcrMethod";

export const useDocuments = () => {
  return useQuery({
    queryKey: ["documents"],
    queryFn: async (): Promise<Document[]> => {
      const { data } = await axios.get(API_URL);
      return data;
    },
  });
};

// Einzelnes Dokument laden
export const useDocument = (id: string) => {
  return useQuery({
    queryKey: ["documents", id],
    queryFn: async (): Promise<Document> => {
      const { data } = await axios.get(`${API_URL}/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

// Dokument hochladen
export const useUploadDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      console.log("upload file query");
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await axios.post(`${API_URL}/upload`, formData);
      console.log("upload file query response data", data);

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });
};

// LLM Upload
export const useUploadDocumentLLM = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      const { data } = await axios.post(`${API_URL}/upload/llm`, formData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });
};

// Dokument Text aktualisieren
export const useUpdateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      extracted_text,
    }: {
      id: string;
      extracted_text: string;
    }) => {
      const { data } = await axios.put(`${API_URL}/${id}`, { extracted_text });
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      queryClient.invalidateQueries({ queryKey: ["documents", variables.id] });
    },
  });
};

export const useChangeOcrMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, method }: { id: string; method: OcrMethod }) => {
      const { data } = await axios.put(`${API_URL}/${id}/ocrMethod`, {
        method,
      });
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });
};

// Dokument löschen
export const useDeleteDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_URL}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });
};
