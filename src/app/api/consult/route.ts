import { NextRequest, NextResponse } from "next/server";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where
} from "firebase/firestore";
import { DatabaseCollections, db } from "lib/firebase.sdk";
import { format } from "date-fns";
import { ConsultType } from "lib/reusableValues";

export async function GET(request: NextRequest) {
  const posyandu = request.nextUrl.searchParams.get("posyandu");
  const konsultasi = request.nextUrl.searchParams.get("konsultasi") as string;

  const selectConsultType = (konsultasi: string) => {
    switch (konsultasi) {
      case ConsultType.HEALTH_CONTROL:
        return DatabaseCollections.HEALTH_CONTROL;
      case ConsultType.BULLYING:
        return DatabaseCollections.BULLYING;
      case ConsultType.STOP_SMOKING:
        return DatabaseCollections.HEALTH_CONTROL;
      case ConsultType.PREGNANCY:
        return DatabaseCollections.HEALTH_CONTROL;
      default:
        return DatabaseCollections.HEALTH_CONTROL;
    }
  }

  const consultRef = posyandu ? (
    query(
      collection(db, selectConsultType(konsultasi)),
      where("posyandu", "==", posyandu),
      orderBy("updatedAt", "desc")
    )
  ) : (
    query(
      collection(db, selectConsultType(konsultasi)),
      orderBy("updatedAt", "desc")
    )
  );

  try {
    const data = await getDocs(consultRef);

    const consults = data.docs.map((doc) => {
      return {
        ...doc.data(),
        updatedAt: format(new Date(doc.data().updatedAt.toDate().toDateString()), "dd MMMM yyyy")
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