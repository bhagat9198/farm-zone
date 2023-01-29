

export default function Index() {
  return (
    <section className="bg-green-100 p-20">
      <h1 className="text-xl" >Welcome to </h1>
      <h1 className="text-3xl text-green-700" >FARM - A - ZONE</h1>
      <hr />
      <div className="my-4" >
        <span className="text-gray-600 font-bold" >Aim : </span>
        <p>This site is targeting teh local farmers who needs a platform to sell there goods/crops/darity products to other users but are afraid to readt out to major onilr sellers as they demad higher commision and lots of documenations which they doesnt even posses.</p>

        <div className="my-2" >
          <p className="text-gray-600 font-bold" >Tech stack used :</p>
          <p>It is buit using <span className="font-bold italic">REMIX</span> which is new framework which is all in one i.e Frontend and Backend. </p>
          <p>
            <span className="font-bold italic"> Supabase </span>is used  for authentication/autherization, setting data in db and uploading files to storage bucket, which internally uses postgress.
          </p>
          <p>Other helpes libeeraies are used just as <span className="italic">tailwind</span> for css, <span className="italic">Prisma</span> for systemically managin the data while pushing to DB.
          </p>
        </div>
      </div>
    </section>
  );
}
