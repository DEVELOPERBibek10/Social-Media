import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/lib/Redux/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
