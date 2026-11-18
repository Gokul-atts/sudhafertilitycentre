import BookAppointment from "@/pages/bookappointment";

export const metadata = {
  alternates: {
    languages: {
      "en-in": "https://sudhafertilitycentre.com/book-appointment",
    },
  },
};

export default function Page() {
  return <BookAppointment />;
}
