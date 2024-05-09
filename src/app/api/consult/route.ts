import { NextRequest, NextResponse } from "next/server";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where
} from "firebase/firestore";
import { DatabaseCollections, db } from "lib/firebase.sdk";

export async function GET(request: NextRequest) {
  const posyandu = request.nextUrl.searchParams.get("posyandu");
  const konsultasi = request.nextUrl.searchParams.get("konsultasi");

  const consultRef = posyandu ? (
    query(
      collection(db, DatabaseCollections.HEALTH_CONTROL),
      where("posyandu", "==", posyandu),
      where("consultationType", "==", konsultasi),
      orderBy("updatedAt", "desc")
    )
  ) : (
    query(
      collection(db, DatabaseCollections.HEALTH_CONTROL),
      where("consultationType", "==", konsultasi),
      orderBy("updatedAt", "desc")
    )
  );

  try {
    const data = await getDocs(consultRef);

    const consults = data.docs.map((doc) => {
      return {
        ...doc.data(),
        updatedAt: doc.data().updatedAt.toDate().toISOString()
      }
    });

    return NextResponse.json({
      data: consults,
      message: `Successfully fetched CONSULTING documents`,
    }, { status: 200 }
    );
  } catch (error) {
    console.error("Error getting CONSULTING documents: ", error);

    return NextResponse.json({
      data: [],
      message: "Error getting CONSULTING documents",
    }, { status: 500 }
    );
  }
}