/* eslint-disable consistent-return */
/* eslint-disable radix */
import { extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";

export async function loadVeeValidate() {
  const { messages } = await import("vee-validate/dist/locale/vi.json");
  Object.keys(rules).forEach((rule) => {
    extend(rule, {
      ...rules[rule], // copies rule configuration
      message: messages[rule], // assign message
    });
  });

  extend("before_now", {
    message: (field) => `${field} phải nhỏ hơn ngày hiện tại`,
    validate(value) {
      const now = new Date();
      const fieldDate = new Date(value);
      return fieldDate.getTime() <= now.getTime();
    },
  });

  extend("after_now", {
    message: (field) => `${field} phải lớn hơn ngày hiện tại`,
    validate(value) {
      const now = new Date();
      const fieldDate = new Date(value);
      return fieldDate.getTime() >= now.getTime();
    },
  });

  extend("compareSalaryTo", {
    message: (field) => `${field} phải lớn hơn Mức lương tối thiểu`,
    validate(value, salaryTo) {
      const salaryFrom =
        typeof value === "number" ? value : value.split(",").join("");
      const salary =
        typeof salaryTo[0] === "number"
          ? salaryTo[0]
          : salaryTo[0].split(",").join("");

      return parseInt(salaryFrom) >= parseInt(salary);
    },
  });

  extend("compareSalaryFrom", {
    message: (field) => `${field} phải nhỏ hơn Mức lương tối đa`,
    validate(value, salaryFrom) {
      const salaryTo =
        typeof value === "number" ? value : value.split(",").join("");
      const salary =
        typeof salaryFrom[0] === "number"
          ? salaryFrom[0]
          : salaryFrom[0].split(",").join("");

      return parseInt(salaryTo) <= parseInt(salary);
    },
  });

  extend("numeric", {
    message: (field) => `${field} chỉ được nhập kí tự số`,
  });

  extend("acceptFile", {
    message: (field) =>
      `${field} phải thuộc định dạng .pdf,.doc,.docx,.xlsx,.xls`,
    validate(value, arrayExtention) {
      const file = value.name;
      // eslint-disable-next-line no-bitwise
      const extentionFile = file.slice(((file.lastIndexOf(".") - 1) >>> 0) + 2);
      if (arrayExtention.includes(extentionFile)) return true;
    },
  });
}
