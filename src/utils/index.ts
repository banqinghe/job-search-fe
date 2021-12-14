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
