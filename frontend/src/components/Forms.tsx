import { Input } from "./Input";

export function Forms(x: any) {
  return (
    <div>
      <div>
        <form>
          {Object(x).map((x: any) => {
            return <Input key={x} mask={x} prefix={x} />;
          })}
        </form>
      </div>
    </div>
  );
}
