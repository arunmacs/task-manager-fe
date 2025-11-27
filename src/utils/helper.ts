// TaskUtils.ts
import {
  FaRegClock,
  FaRegCheckCircle,
  FaBriefcase,
  FaHome,
  FaListAlt,
} from "react-icons/fa";
import type { IconType } from "react-icons";

interface MapEntry {
  text: string;
  Icon: IconType;
  color: string;
}

const statusMap: Record<string, MapEntry> = {
  pending: { text: "Pending", Icon: FaRegClock, color: "#F59E0B" },
  completed: { text: "Completed", Icon: FaRegCheckCircle, color: "#10B981" },
};

const categoryMap: Record<string, MapEntry> = {
  work: { text: "Work", Icon: FaBriefcase, color: "#3B82F6" },
  personal: { text: "Personal", Icon: FaHome, color: "#10B981" },
  general: { text: "General", Icon: FaListAlt, color: "#6B7280" },
};

export const getStatusProps = (status: string): MapEntry =>
  statusMap[status] || statusMap.pending;
export const getCategoryProps = (category: string): MapEntry =>
  categoryMap[category] || categoryMap.general;
