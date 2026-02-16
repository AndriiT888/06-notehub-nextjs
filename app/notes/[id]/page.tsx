import { dehydrate } from "@tanstack/react-query";
import { makeQueryClient } from "@/lib/api/quryClient";
import { fetchNoteById } from "@/lib/api/notes";
import HydrateClient from "@/components/HydrateClient/HydrateClient";
import NoteDetailsClient from "./NoteDetails.client";

export default async function NoteDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = makeQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  return (
    <HydrateClient state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrateClient>
  );
}
