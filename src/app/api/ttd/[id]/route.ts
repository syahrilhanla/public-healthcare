import { doc, getDoc } from "firebase/firestore";
import { DatabaseCollections, db } from "lib/firebase.sdk";
import { NextRequest, NextResponse } from "next/server";

interface Context {
  params: {
    id: string;
  };
}

// To handle a GET request to /api/ttd/:id
export async function GET(request: NextRequest, context: Context) {
  const id = context.params.id;

  const TTDRef = doc(db, DatabaseCollections.TTDS, id);

  try {
    const docSnap = await getDoc(TTDRef);

    if (docSnap.exists()) {
      const TTD = {
        ...docSnap.data(),
        updatedAt: docSnap.data().updatedAt.toDate().toISOString()
      };

      return NextResponse.json({
        data: TTD,
        message: "Successfully fetched TTD document",
        id: id
      }, { status: 200 }
      );
    } else {
      return NextResponse.json({
        data: {},
        message: "No such TTD document",
        id: id
      }, { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error getting TTD document: ", error);

    return NextResponse.json({
      data: {},
      message: "Error getting TTD document",
      id: id
    }, { status: 500 }
    );
  }
}