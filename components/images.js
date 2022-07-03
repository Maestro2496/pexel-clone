import ImageComponent from "./Image";
export default function GridImages({images}) {
  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-3 sm:grid-cols-3 gap-y-4 md:grid-cols-3 lg:grid-cols-4"
    >
      {images.map((image) => (
        <li key={image.id} className="relative">
          <ImageComponent image={image} />
        </li>
      ))}
    </ul>
  );
}
