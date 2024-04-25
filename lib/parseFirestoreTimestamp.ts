import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";

const parseFirestoreTimestamp = (timestamp: Timestamp) => {
  return format(new Date(timestamp.toDate().toDateString()), "dd MMMM yyyy");
}

export default parseFirestoreTimestamp;