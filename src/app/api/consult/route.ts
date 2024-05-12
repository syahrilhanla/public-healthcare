import { NextRequest, NextResponse } from "next/server";
import {
  collection,
  doc,
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
        return DatabaseCollections.HEALTH_CONTROL;
      case ConsultType.PREGNANCY:
        return DatabaseCollections.HEALTH_CONTROL;
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

  const payload = {
    consultId: body.consultId,
    message: body.message,
    name: body.name,
    posyandu: body.posyandu,
    type: body.type,
    updatedAt: serverTimestamp(),
    userId: body.userId
  };

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

  try {
    await setDoc(doc(
      db,
      targetCollection(body.consultType as ConsultType),
      body.consultId
    ), payload);

    return NextResponse.json({
      data: payload,
      message: `Successfully added a new CONSULTING document`,
    }, { status: 200 }
    );
  } catch (error) {
    console.error("Error adding a new CONSULTING document: ", error);

    return NextResponse.json({
      data: payload,
      message: "Error adding a new CONSULTING document",
    }, { status: 500 }
    );
  }
}