import HeaderBar from "@/components/HeaderBar";
import NewInput from "@/components/NewInput";
export default function ClientPage() {
  return (
    <>
    <HeaderBar />
      <div>ClientPage</div>
      <div className="mx-auto border rounded-lg w-2/3">
      <NewInput
          placeholder="請輸入密碼"
        />
      </div>
    </>
  );
}
