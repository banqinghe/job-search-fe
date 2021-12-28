import cities from '@/assets/city.json';

/**
 * 通过城市名求得带有省名的数组，用于在只有城市名的情况下初始化带有级联输入地点的表单
 */
export function getLocationArray(targetCity: string) {
  for (let i = 0, provinceLen = cities.length; i < provinceLen; i++) {
    const cityList = cities[i].children;
    for (let j = 0, cityLen = cityList.length; j < cityLen; j++) {
      if (cityList[j] === targetCity) {
        return [cities[i].value, targetCity];
      }
    }
  }
  return [targetCity];
}

/**
 * 格式化 Date 对象为 YYYY-MM-dd hh:mm 格式
 */
export function formatDate(date: Date, displayHour?: boolean) {
  function formatNum(num: number) {
    return num.toString().padStart(2, '0')
  }

  const dateStr = (
    date.getFullYear() + '-' + formatNum(date.getMonth() + 1) + '-' +
    formatNum(date.getDate())
  );

  return displayHour ? 
    dateStr + ' ' + formatNum(date.getHours()) + ':' + formatNum(date.getMinutes()) :
    dateStr;
}

function handleFileDownload(url: string, filename: string) {
  let a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
}

/**
 * 实现点击下载
 */
export function handlePdfLink (url: string, filename: string) {
  fetch(url, {
    method: 'get',
  })
    .then(function (res) {
      if (res.status !== 200) {
        return res.json()
      }
      return res.arrayBuffer()
    })
    .then((blobRes) => {
      const e = new Blob([blobRes], {
        type: 'application/octet-stream',
      })
      // 将 Blob 对象转为 url
      const link = window.URL.createObjectURL(e)
      handleFileDownload(link, filename)
    }).catch(err => {
      console.error(err)
    })
}
