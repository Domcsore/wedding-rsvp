const Rsvp = ({ params }: { params: { guestId: string } }) => {
  return (
    <>
      <h1>RSVP</h1>
      <p>GuestId: {params.guestId}</p>
    </>
  );
};

export default Rsvp;
