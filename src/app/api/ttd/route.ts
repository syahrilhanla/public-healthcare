import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { DatabaseCollections, db } from "lib/firebase.sdk";
import { NextRequest, NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET(request: NextRequest) {
  const year = request.nextUrl.searchParams.get("year");

  const TTDRef = query(collection(db, DatabaseCollections.TTDS),
    where("years", "array-contains", year), orderBy("updatedAt", "desc"));

  try {
    const data = await getDocs(TTDRef);

    const TTDs = data.docs.map((doc) => {
      return {
        ...doc.data(),
        updatedAt: doc.data().updatedAt.toDate().toISOString()
      }
    });

    return NextResponse.json({
      data: TTDs,
      message: "",
      year: year
    }, { status: 200 }
    );
  } catch (error) {
    console.error("Error getting TTD documents: ", error);

    return NextResponse.json({
      data: [],
      message: "Error getting TTD documents",
      year: year
    }, { status: 500 }
    );
  }
}