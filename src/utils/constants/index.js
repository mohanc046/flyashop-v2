import _ from 'lodash';

export const FIXED_VALUES = {
    drawerWidth: 450,
    tableColumnWidth: 150,
    paginationLength: 10,
    statusCode: {
        SUCCESS: 200,
        FAILED: 500
    },
    pdfStyle: {
        startY: 25,
        theme: "grid",
        styles: {
            font: "times",
            halign: "center",
            cellPadding: 3.5,
            lineWidth: 0.5,
            lineColor: [0, 0, 0],
            textColor: [0, 0, 0]
        },
        headStyles: {
            textColor: [0, 0, 0],
            fontStyle: "normal",
            lineWidth: 0.5,
            lineColor: [0, 0, 0],
        },
        alternateRowStyles: {
            textColor: [0, 0, 0],
            lineWidth: 0.5,
            lineColor: [0, 0, 0]
        },
        rowStyles: {
            lineWidth: 0.5,
            lineColor: [0, 0, 0]
        },
        tableLineColor: [0, 0, 0],
        willDrawCell: function (row, data) {
            if (row.section == 'body' && row.column.raw.dataIndex === 'colorCode') {
                const rgb = hexToRgb(row.cell.raw);
                row.doc.setFillColor(rgb.r, rgb.g, rgb.b)
                if (_.includes(row.cell.raw, '000'))
                    row.doc.setTextColor(255, 255, 255)
                else
                    row.doc.setTextColor(0, 0, 0)
                row.doc.setFontSize(11.5);
            }
        },
    },
    BUSINESS_TYPE: [
        "Home & Kitchen",
        "Sports & Outdoors",
        "Toys & Games",
        "Beauty & Personal Care",
        "Health Care",
        "Household & Baby Care",
        "Kitchen & Dining",
        "Office Products",
        "Garden & Outdoor",
    ],
    RUPEE_SYMBOL: '₹',
    DISCOUNT_TYPE: {
        PERCENT: "DISCOUNT PERCENT",
        FLAT: "FLAT DISCOUNT",
    }
}