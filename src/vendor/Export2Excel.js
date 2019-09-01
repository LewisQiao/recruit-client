/* eslint-disable */
require('script-loader!file-saver');
require('script-loader!./Blob.js');
require('script-loader!xlsx/dist/xlsx.core.min');

function generateArray(table) {
  var out = [];
  var rows = table.querySelectorAll('tr');
  var ranges = [];
  for (var R = 0; R < rows.length; ++R) {
    var outRow = [];
    var row = rows[R];
    var columns = row.querySelectorAll('td');
    for (var C = 0; C < columns.length; ++C) {
      var cell = columns[C];
      var colspan = cell.getAttribute('colspan');
      var rowspan = cell.getAttribute('rowspan');
      var cellValue = cell.innerText;
      if (cellValue !== "" && cellValue == +cellValue) cellValue = +cellValue;

      //Skip ranges
      ranges.forEach(function (range) {
        if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
          for (var i = 0; i <= range.e.c - range.s.c; ++i) outRow.push(null);
        }
      });

      //Handle Row Span
      if (rowspan || colspan) {
        rowspan = rowspan || 1;
        colspan = colspan || 1;
        ranges.push({
          s: {
            r: R,
            c: outRow.length
          },
          e: {
            r: R + rowspan - 1,
            c: outRow.length + colspan - 1
          }
        });
      };

      //Handle Value
      outRow.push(cellValue !== "" ? cellValue : null);

      //Handle Colspan
      if (colspan)
        for (var k = 0; k < colspan - 1; ++k) outRow.push(null);
    }
    out.push(outRow);
  }
  return [out, ranges];
};

function datenum(v, date1904) {
  if (date1904) v += 1462;
  var epoch = Date.parse(v);
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}

function sheet_from_array_of_arrays(data, opts) {
  var ws = {};
  var range = {
    s: {
      c: 10000000,
      r: 10000000
    },
    e: {
      c: 0,
      r: 0
    }
  };
  for (var R = 0; R != data.length; ++R) {
    for (var C = 0; C != data[R].length; ++C) {
      if (range.s.r > R) range.s.r = R;
      if (range.s.c > C) range.s.c = C;
      if (range.e.r < R) range.e.r = R;
      if (range.e.c < C) range.e.c = C;
      var cell = {
        v: data[R][C]
      };
      if (cell.v == null) continue;
      var cell_ref = XLSX.utils.encode_cell({
        c: C,
        r: R
      });

      if (typeof cell.v === 'number') cell.t = 'n';
      else if (typeof cell.v === 'boolean') cell.t = 'b';
      else if (cell.v instanceof Date) {
        cell.t = 'n';
        cell.z = XLSX.SSF._table[14];
        cell.v = datenum(cell.v);
      } else cell.t = 's';

      ws[cell_ref] = cell;
    }
  }
  if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
  return ws;
}

function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook();
  this.SheetNames = [];
  this.Sheets = {};
}

function s2ab(s) {
  var buf = new ArrayBuffer(s.length);
  var view = new Uint8Array(buf);
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
}

function export_table_to_excel(id) {
  var theTable = document.getElementById(id);
  console.log('a')
  var oo = generateArray(theTable);
  var ranges = oo[1];

  /* original data */
  var data = oo[0];
  var ws_name = "SheetJS";
  console.log(data);

  var wb = new Workbook(),
    ws = sheet_from_array_of_arrays(data);

  /* add ranges to worksheet */
  // ws['!cols'] = ['apple', 'banan'];
  ws['!merges'] = ranges;

  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  var wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  });

  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), "test.xlsx")
}

function formatJson(jsonData) {
  console.log(jsonData)
}

function formatJson2Excel(filterVal, jsonData) {
  return jsonData.map(v => filterVal.map(j => v[j]));
}

function export_json_to_excel(th, jsonData, defaultTitle, type) {

  /* original data */

  var data = jsonData;
  data.unshift(th);
  var ws_name = "SheetJS";

  var wb = new Workbook(),
    ws = sheet_from_array_of_arrays(data);


  /* add worksheet to workbook */
  wb.SheetNames.push(ws_name);
  wb.Sheets[ws_name] = ws;

  var wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  });
  var title = defaultTitle || '列表'
  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), title + "." + type)
}

export function exportFile(list, menu, type) {
  var tHeader;
  var filterVal;
  var title;
  if (menu == "user") {
    title = "用户管理";
    tHeader = ["登录名", "姓名", "手机", "邮箱", "角色", "状态"];
    filterVal = ["loginName", "name", "mobile", "email", "roleName", "statusName"];
  } else if (menu == "resource") {
    title = "资源管理";
    tHeader = ["资源名称", "排序", "状态", "访问地址", "父资源名称", "图标"];
    filterVal = ["text", "sort", "statusName", "url", "upText", "icon"];
  } else if (menu == "role") {
    title = "角色管理";
    tHeader = ["角色名"];
    filterVal = ["roleName"];
  } else if (menu == "device") {
    title = "远程参数设置";
    tHeader = ["ID", "地址名称", "时间", "状态"];
    filterVal = ["m_id", "m_login_count", "ipAddress", "accessPassword"];
  } else if (menu == "room") {
    title = "会话参数设置";
    tHeader = ["会话房间号", "房间密码", "客服ID", "终端设备ID", "会话开始时间", "会话结束时间", "是否进行转接", "是否进行协助", "关联问题ID", "市民身份证号"];
    filterVal = ["roomId", "roomPass", "staffId", "deviceId", "startTimeName", "startTimeName", "isTransferName", "isControlName", "problemId", "idCard"];
  } else if (menu == "staff") {
    title = "客服人员信息";
    tHeader = ["客服ID", "客服姓名", "关联用户ID", "房间号", "客服级别", "IP地址", "在线状态"];
    filterVal = ["staffId", "name", "userId", "roomId", "level", "ipAddress", "onlineStatusName"];
  } else if (menu == "visitor") {
    title = "市民信息";
    tHeader = ["身份证号", "姓名", "性别", "电话", "地址", "备注"];
    filterVal = ["idCard", "visitorName", "sexName", "phone", "address", "remark"];
  } else if (menu == "problem") {
    title = "咨询问题";
    tHeader = ["问题ID", "姓名", "电话", "咨询类型", "问题生成时间", "问题结束时间", "问题描述", "问题状态"];
    filterVal = ["id", "visitor.visitorName", "visitor.phone", "problemTypeName", "startTimeName", "endTimeName", "description", "problemStatusName"];
  } else { // 不存在
    return;
  }
  var data = formatJson2Excel(filterVal, list);
  export_json_to_excel(tHeader, data, title, type);
}

Export2Excel.js