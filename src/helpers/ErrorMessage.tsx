import { toast } from "react-toastify";

export default function errorMessages(error: any) {
  if (error?.status === 401) {
    return;
  } else if (error.data !== "Unauthorized") {
    toast.error(
      <>
        {typeof error.data === "string"
          ? error.data
          : typeof error.data === "object" && error?.data?.code
          ? error.data?.code?.map((x: any, index: number) => (
              <div key={x} className="p-1">
                {index + 1}.{x}
              </div>
            ))
          : error?.data.map((x: any, index: number) => (
              <div key={x} className="p-1">
                {index + 1}.{x}
              </div>
            ))}
      </>,
      {
        theme: "colored",
      },
    );
  } else if (error.data === "" && error.data.length < 1) {
    toast.error("Canceled in 10 seconds", { theme: "colored" });
  } else return;
}
