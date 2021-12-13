export type SubList = {
  start: number;
  end: number;
  word: string[];
};

const timeString2ms = (time: string) => {
  let timeArr = time.split('.');
  const timems = parseInt(timeArr[1]);
  timeArr = timeArr[0].split(':');
  const times = timeArr[2]
    ? parseInt(timeArr[1]) * 3600 + parseInt(timeArr[1]) * 60 + parseInt(timeArr[2])
    : parseInt(timeArr[0]) * 60 + parseInt(timeArr[1]);

  return times + timems / 1000;
};

const convertVttToJson = (vttString: string): Promise<SubList[]> => {
  return new Promise((resolve, reject) => {
    let current: any = {};
    let sections: Array<any> = [];
    let start: boolean = false;

    const vttArray: Array<any> = vttString.split('\n');

    vttArray.forEach((item, index) => {
      const line = item.trim();
      if (!start && /-->/.test(line)) {
        start = true;
        current = {
          start: timeString2ms(line.split('-->')[0].trimRight().split(' ').pop()),
          end: timeString2ms(line.split('-->')[1].trimLeft().split(' ').shift()),
          word: [],
        };
      } else if (start && line) {
        const newLine = line.replace(/<\/?[^>]+(>|$)/g, ' ').trim();
        current.word.push(newLine);
      } else if (start && !line) {
        start = false;
        sections.push({ ...current });
        current = {};
      }
    });

    resolve(sections);
  });
};

export default convertVttToJson;
