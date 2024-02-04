import { create } from "zustand";

interface AppState  {
    isDeleteModalOpen: boolean;
    setIsDeleteModalOpen: (open: boolean) => void;

    isRenameModalOpen: boolean;
    setIsRenameModalOpen: (open: boolean) => void;

    fileId: string | null;
    setFileId: (fileId: string) => void;

    fileName: string | null;
    setFileName: (fileName: string) => void;
}

export const useAppStore = create<AppState>()((set) => ({
    isDeleteModalOpen: false,
    setIsDeleteModalOpen: (open) => set((state) => ({isDeleteModalOpen: open})),

    isRenameModalOpen: false,
    setIsRenameModalOpen: (open) => set((state) => ({isRenameModalOpen: open})),

    fileId: null,
    setFileId: (fileId: string) => set((state) => ({fileId})),

    fileName: "",
    setFileName: (fileName: string) => set((state) => ({fileName})),
}))