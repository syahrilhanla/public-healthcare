import { NextRequest, NextResponse } from "next/server";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where
} from "firebase/firestore";
import { DatabaseCollections, db } from "lib/firebase.sdk";
import { format } from "date-fns";

import { ConsultType } from "lib/reusableValues";
import { Consult } from "type/consult.type";

export async function GET(request: NextRequest) {
  const posyandu = request.nextUrl.searchParams.get("posyandu");
  const konsultasi = request.nextUrl.searchParams.get("konsultasi") as string;
  const keluhan = request.nextUrl.searchParams.get("keluhan");

  const selectConsultType = (konsultasi: string) => {
    switch (konsultasi) {
      case ConsultType.HEALTH_CONTROL:
        return DatabaseCollections.HEALTH_CONTROL;
      case ConsultType.BULLYING:
        return DatabaseCollections.BULLYING;
      case ConsultType.STOP_SMOKING:
        return DatabaseCollections.STOP_SMOKING;
      case ConsultType.PREGNANCY:
        return DatabaseCollections.PREGNANCY;
      default:
        return DatabaseCollections.HEALTH_CONTROL;
    }
  }

  const posyanduQuery = posyandu ? where("posyandu", "==", posyandu) : null;
  const keluhanQuery = keluhan ? where("type", "==", keluhan) : null;

  const consultRef = posyanduQuery && keluhanQuery ? (
    query(
      collection(db, selectConsultType(konsultasi)),
      posyanduQuery,
      keluhanQuery,
      orderBy("updatedAt", "desc")
    )
  ) : posyanduQuery ? (
    query(
      collection(db, selectConsultType(konsultasi)),
      posyanduQuery,
      orderBy("updatedAt", "desc")
    )
  ) : keluhanQuery ? (
    query(
      collection(db, selectConsultType(konsultasi)),
      keluhanQuery,
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

export async function POST(request: NextRequest) {
  const body: Consult & { consultType: string } = await request.json();

  const { consultType, ...restOfBody } = body;

  let payload = {
    ...restOfBody,
    updatedAt: serverTimestamp(),
  };

  if (consultType !== ConsultType.HEALTH_CONTROL) {
    delete payload.type;
  }

  const targetCollection = (consultType: ConsultType) => {
    switch (consultType) {
      case ConsultType.HEALTH_CONTROL:
        return DatabaseCollections.HEALTH_CONTROL;
      case ConsultType.BULLYING:
        return DatabaseCollections.BULLYING;
      case ConsultType.STOP_SMOKING:
        return DatabaseCollections.STOP_SMOKING;
      case ConsultType.PREGNANCY:
        return DatabaseCollections.PREGNANCY;
      default:
        return DatabaseCollections.HEALTH_CONTROL;
    }
  }

  let isDocExist: boolean = false;

  try {
    const reference = body.consultId;

    isDocExist = (await getDoc(doc(
      db,
      targetCollection(body.consultType as ConsultType),
      reference
    ))).exists();

    await setDoc(doc(
      db,
      targetCollection(body.consultType as ConsultType),
      reference
    ), payload);

    const feedbackMessage = isDocExist ? "Berhasil mengubah data!" : "Berhasil membuat data!";

    return NextResponse.json({
      data: payload,
      message: feedbackMessage,
      status: 200
    }, { status: 200 }
    );
  } catch (error) {
    const errorMessage = isDocExist
      ? "Error updating the document" : "Error creating a new document";
    console.error(errorMessage, error);

    return NextResponse.json({
      data: payload,
      message: errorMessage,
      status: 500
    }, { status: 500 }
    );
  }
}