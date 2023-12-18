import type { checkAuthPayload } from "@lib/shared_types";

import { useAuth } from "@/contexts/AuthContext";
import {
  createSpace,
  updateSpace,
  getSpace,
  getSpaceByLicense,
  createAccount,
} from "@/utils/client";

export default function TestPage() {
  const { logout } = useAuth();
  const Init_Spaces = async () => {
    const floor = ["B1", "B2", "B3"];
    const abc = ["A", "B", "C", "D", "E", "F"];
    for (let k = 0; k < 3; k++) {
      for (let j = 0; j < 6; j++) {
        for (let i = 1; i <= 20; i++) {
          const isPrioirty = j < 2 && [1, 2, 11, 12].includes(i);
          await createSpace({
            floor: floor[k],
            section: abc[j],
            number: i,
            priority: isPrioirty,
            occupied: false,
            history: [],
          });
          console.log(floor[k], abc[j], i);
        }
      }
    }
  };
  const Update_Spaces = async () => {
    await updateSpace("B1", "A", 2, {
      occupied: true,
      license: "test-113",
      history: [
        {
          license: "test-113",
          arrivalTime: new Date("2023-12-05T12:17:32.171Z"),
          departureTime: new Date("2023-12-05T12:17:32.171Z"),
        },
      ],
    });
  };

  const Reset_Spaces = async () => {
    const abc = ["A", "B", "C", "D", "E", "F"];
    //B1
    for (let j = 0; j < 6; j++) {
      for (let i = 1; i <= 20; i++) {
        const ABC = abc[j];
        console.log("B1", ABC, i);
        await updateSpace("B1", ABC, i, {
          history: [],
        });
        console.log("B2", ABC, i);
        await updateSpace("B2", ABC, i, {
          history: [],
        });
        console.log("B3", ABC, i);
        await updateSpace("B3", ABC, i, {
          history: [],
        });
      }
    }
  };
  const Monk_Spaces = async () => {
    const abc = ["A", "B", "C", "D", "E", "F"];
    //B1
    for (let j = 0; j < 6; j++) {
      for (let i = 1; i <= 20; i++) {
        const ABC = abc[j];
        console.log("B1", ABC, i);
        await updateSpace("B1", ABC, i, {
          occupied: true,
          license: "test-113",
          history: [
            {
              license: "test-113",
              arrivalTime: new Date("2023-12-14T09:01:00.171+08:00"),
              departureTime: new Date("2023-12-14T21:01:00.171+08:00"),
            },
          ],
        });
        console.log("B2", ABC, i);
        await updateSpace("B2", ABC, i, {
          occupied: true,
          license: "test-113",
          history: [
            {
              license: "test-113",
              arrivalTime: new Date("2023-12-14T09:01:00.171+08:00"),
              departureTime: new Date("2023-12-15T21:01:00.171+08:00"),
            },
          ],
        });
        console.log("B3", ABC, i);
        await updateSpace("B3", ABC, i, {
          occupied: true,
          license: "test-113",
          history: [
            {
              license: "test-113",
              arrivalTime: new Date("2023-12-14T08:01:00.171+08:00"),
              departureTime: new Date("2023-12-14T21:01:00.171+08:00"),
            },
          ],
        });
      }
    }
  };

  const Get_Space = async () => {
    const result = await getSpace("B1", "A", 1);
    console.log(result);
  };
  const Get_Space_By_License = async () => {
    const result = await getSpaceByLicense("test123");
    console.log(result);
  };
  const Create_Account = async () => {
    const payload: checkAuthPayload = {
      username: "test1",
      password: "12345678",
    };
    const result = await createAccount(payload);
    console.log(result);
  };
  const Logout = async () => {
    await logout();
  };

  return (
    <main className="max-w-screen container max-h-screen">
      {/* 測試功能的按鈕 */}
      <button onClick={Init_Spaces} className="border-2 border-white">
        初始化停車位
      </button>
      <button onClick={Update_Spaces} className="border-2 border-white">
        更新測試
      </button>
      <button onClick={Monk_Spaces} className="border-2 border-white">
        資料新增模擬
      </button>
      <button onClick={Reset_Spaces} className="border-2 border-white">
        清除歷史資料
      </button>
      <button onClick={Get_Space} className="border-2 border-white">
        GET測試
      </button>
      <button onClick={Get_Space_By_License} className="border-2 border-white">
        GET BY LICENSE測試
      </button>
      <button onClick={Create_Account} className="border-2 border-white">
        創建警衛帳號
      </button>
      <button onClick={Logout} className="border-2 border-white">
        登出
      </button>
    </main>
  );
}
