interface Props {
  name: string;
  price: string;
  href?: string;
}

export default function ServiceCard({ name, price, href }: Props) {
  return (
    <div className="border rounded-lg p-6 shadow hover:shadow-md transition text-center">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-600 mb-4">{price}</p>
      {href && (
        <a href={href} className="text-blue-600 hover:underline">Book</a>
      )}
    </div>
  );
}
