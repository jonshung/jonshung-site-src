import Image from "next/image";
import RootLayout, { SolidWhiteContainer } from "../layout";
export default function blogHub() {
  return (
    <SolidWhiteContainer>
      <div className="absolute h-[80%] top-10 -left-[100px] w-[60%] justify-center">
        <Image
          className="absolute flex object-cover"
          src="/media/images/school-bg.jpg"
          fill
          alt="HCMUS"
        />
      </div>
      <div className="ml-40 mt-10 mr-5 relative text-left overflow-hidden flex">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae
        finibus erat. Mauris auctor suscipit dolor, vel consectetur odio congue
        eget. Vestibulum sed lorem ac eros hendrerit placerat. Vivamus ut nunc a
        lorem tempor tempor sit amet fermentum justo. Curabitur sed ante in urna
        viverra ullamcorper nec quis lectus. Sed condimentum pellentesque
        fringilla. Phasellus vel porttitor orci. Nulla in fringilla felis. Proin
        vitae viverra purus. Donec sollicitudin consectetur ipsum ac bibendum.
        In pellentesque turpis tincidunt tincidunt feugiat. Maecenas augue
        dolor, volutpat congue lacus sed, lobortis tristique erat. Cras a
        suscipit ante, sed scelerisque sem. Aenean dapibus lobortis ultrices.
        Etiam porttitor lectus pretium lorem tincidunt imperdiet. Vestibulum a
        sapien a sapien porttitor suscipit. Nulla facilisi. Nulla leo erat,
        porta sit amet rhoncus eget, suscipit sit amet tortor. Sed tincidunt est
        at aliquam euismod. Quisque non turpis et dui fermentum pharetra eu nec
        turpis. Proin aliquet libero sed dolor aliquet consectetur. Maecenas dui
        tellus, efficitur a egestas non, scelerisque in sem. Phasellus
        ullamcorper in est vel condimentum. Ut viverra convallis lorem, lacinia
        mollis metus pellentesque ut.
      </div>
    </SolidWhiteContainer>
  );
}
