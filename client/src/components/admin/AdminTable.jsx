import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

const AdminTable = ({ data, columns, imageKey, nameKey, orderKey, onEdit, onDelete }) => {
  return (
    <Table className="border rounded-lg overflow-hidden">
      <TableHeader>
        <TableRow className="bg-gray-100 dark:bg-gray-800">
          {columns.map((col, idx) => (
            <TableHead key={idx} className={col.className}>
              {col.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, idx) => (
          <TableRow
            key={item._id || idx}
            className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <TableCell className="text-center">{item[orderKey] ?? idx + 1}</TableCell>
            <TableCell className="text-center">
              {item[imageKey] ? (
                <img
                  src={item[imageKey]}
                  alt={item[nameKey]}
                  className="w-16 h-16 object-cover rounded"
                />
              ) : (
                "-"
              )}
            </TableCell>
            <TableCell>{item[nameKey]}</TableCell>
            <TableCell className="text-center space-x-2">
              <button
                onClick={() => onEdit(item)}
                className="bg-yellow-400 text-gray-800 px-2 py-1 rounded hover:bg-yellow-500"
              >
                แก้ไข
              </button>
              <button
                onClick={() => onDelete(item._id)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                ลบ
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AdminTable;