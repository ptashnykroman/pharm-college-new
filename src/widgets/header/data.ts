import { cache } from 'react'

import { getHeaderSchedule, getShellData } from "@/shared/api/graphql/sdk";
import { buildFooterViewModel } from "@/widgets/footer/model";
import { buildHeaderViewModel } from "@/widgets/header/model";

const getSiteChromeDataCached = cache(async () => {
  const [shellData, scheduleData] = await Promise.all([
    getShellData(),
    getHeaderSchedule(),
  ]);

  const header = buildHeaderViewModel(shellData, scheduleData);
  const footer = buildFooterViewModel(shellData, header.navigation);

  return {
    header,
    footer,
  };
})

export async function getSiteChromeData() {
  return getSiteChromeDataCached()
}
