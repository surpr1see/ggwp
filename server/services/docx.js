const { Document, Table, TableCell, TableRow, VerticalAlign, Paragraph, Packer, AlignmentType, HeadingLevel } = require('docx');
const fs = require('fs');

const { Education } = require('./../services/education.js');
const { Student } = require('./../services/student.js');

class Docx {
    async createEducationsDocument(educationsToDoc) {
        const doc = new Document();

        const tableHeader = new TableRow({
            children: [
                new TableCell({
                    children: [
                        new Paragraph({
                            text: 'Назва освітньої програми',
                            alignment: AlignmentType.CENTER
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER  
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            text: 'Освітній ступінь',
                            alignment: AlignmentType.CENTER
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER  
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            text: 'Загальна чисельність випускників (денної форми навчання)',
                            alignment: AlignmentType.CENTER
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER  
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            text: 'Загальна чисельність респондентів (випускники, які взяли участь в опитуванні',
                            alignment: AlignmentType.CENTER
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER  
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            text: 'Працевлаштовані',
                            alignment: AlignmentType.CENTER
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER  
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            text: 'Незайняті, проте шукають роботу',
                            alignment: AlignmentType.CENTER
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER  
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            text: 'Повністю зайняті науковою роботою',
                            alignment: AlignmentType.CENTER
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER  
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            text: 'Недоступні для роботи (наприклад, в армії, декретна відпустка)',
                            alignment: AlignmentType.CENTER
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER  
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            text: 'Чисельність випускників, які розпочали власний бізнес після закінчення навчання',
                            alignment: AlignmentType.CENTER
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            text: 'Чисельність випускників, яким присвоєно почесні звання України',
                            alignment: AlignmentType.CENTER
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER
                })
            ]
        });

        let tableRows = [ tableHeader ];

        educationsToDoc.forEach(education => {
            tableRows.push(this.createEducationRow(education));
        });

        let educationsTable; 
        try {
            educationsTable = new Table({
                rows: tableRows
            });
        } catch(error) {
            console.log("Error while creating table: " + error);
        }

        doc.addSection({
            children: [
                new Paragraph({
                    text: 'Факультет ЕІ',
                    alignment: AlignmentType.RIGHT
                }),
                new Paragraph({
                    text: 'Спеціальність 12',
                    alignment: AlignmentType.RIGHT
                }),
                new Paragraph({
                    text: 'ОПП 122, 126',
                    alignment: AlignmentType.RIGHT
                }),
                new Paragraph({
                    text: 'Випуск 2019 року',
                    alignment: AlignmentType.RIGHT
                }),

                new Paragraph({
                    text: 'ФОРМА ЗВІТНОСТІ',
                    alignment: AlignmentType.CENTER
                }),
                new Paragraph({
                    text: 'про зайнятість випускників ХНЕУ ім. С. Кузнеця у грудні 2019 року ',
                    alignment: AlignmentType.CENTER
                }),
                new Paragraph({
                    text: 'за освітніми програмами факультету магістри 122, 126 (денної форми навчання)',
                    alignment: AlignmentType.CENTER
                }),

                educationsTable
            ]
        });

        const bufferedDoc = await Packer.toBuffer(doc);
        fs.writeFileSync(__dirname + "\\doc.docx", bufferedDoc);

        console.log(educationsToDoc);
    }

    createEducationRow(education) {
        const rowCells = [
            new TableCell({
                children: [
                    new Paragraph({
                        text: education.educationProgramTitle.toString(),
                        alignment: AlignmentType.CENTER
                    })
                ],
                verticalAlign: VerticalAlign.CENTER
            }),
            new TableCell({
                children: [
                    new Paragraph({
                        text: education.gradeValue.toString(),
                        alignment: AlignmentType.CENTER
                    })
                ],
                verticalAlign: VerticalAlign.CENTER
            })
        ];

        delete education.educationProgramTitle;
        delete education.gradeValue;

        const cellsContent = Object.values(education);
        cellsContent.pop();

        cellsContent.forEach(content => {
            rowCells.push(new TableCell({
                children: [
                    new Paragraph({
                        text: content ? content.toString() : '',
                        alignment: AlignmentType.CENTER
                    })
                ],
                verticalAlign: VerticalAlign.CENTER
            }));
        });

        return new TableRow({
            children: rowCells
        });
    }

    

    async createStudentsDocument(studentsToDoc) {
        const doc = new Document();

        const tableHeader = new TableRow({
            children: [
                new TableCell({
                    children: [
                        new Paragraph({
                            text: 'Прізвище, ім’я, по-батькові',
                            alignment: AlignmentType.CENTER
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER  
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            text: 'Телефон',
                            alignment: AlignmentType.CENTER
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER  
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            text: 'e-mail',
                            alignment: AlignmentType.CENTER
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER  
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            text: 'Сторінка у Facebook, LinkedIn',
                            alignment: AlignmentType.CENTER
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER  
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            text: 'Посада',
                            alignment: AlignmentType.CENTER
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER  
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            text: 'Назва підприємства (установи)',
                            alignment: AlignmentType.CENTER
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER  
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            text: 'Регіон (область, місто)',
                            alignment: AlignmentType.CENTER
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER  
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            text: 'Сфера діяльності',
                            alignment: AlignmentType.CENTER
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER  
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            text: 'Незайняті, проте шукають роботу/ не брав участь в опитуванні',
                            alignment: AlignmentType.CENTER
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            text: 'Повна зайнятість (науковою роботою - для магістрів, навчання в магістратурі - для бакалаврів)',
                            alignment: AlignmentType.CENTER
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            text: 'Недоступність для роботи (в армії / декретна відпустка)',
                            alignment: AlignmentType.CENTER
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            text: 'Розпочато власний бізнес після закінчення навчання',
                            alignment: AlignmentType.CENTER
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            text: 'Відзнаки, досягнення(у т.ч., присвоєно почесні звання України)',
                            alignment: AlignmentType.CENTER
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER
                }),
                new TableCell({
                    children: [
                        new Paragraph({
                            text: 'Джерело інформації про працевлаштування (опитування довідка №)',
                            alignment: AlignmentType.CENTER
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER
                })
            ]
        });

        let tableRows = [ tableHeader ];

        studentsToDoc.forEach(student => {
            tableRows.push(this.createStudentRow(student));
        });

        let educationsTable; 
        try {
            educationsTable = new Table({
                rows: tableRows
            });
        } catch(error) {
            console.log("Error while creating table: " + error);
        }

        doc.addSection({
            children: [
                new Paragraph({
                    text: 'Факультет ЕІ',
                    alignment: AlignmentType.RIGHT
                }),
                new Paragraph({
                    text: 'Спеціальність 12',
                    alignment: AlignmentType.RIGHT
                }),
                new Paragraph({
                    text: 'ОПП 122, 126',
                    alignment: AlignmentType.RIGHT
                }),
                new Paragraph({
                    text: 'Випуск 2019 року',
                    alignment: AlignmentType.RIGHT
                }),

                new Paragraph({
                    text: 'ФОРМА ЗВІТНОСТІ',
                    alignment: AlignmentType.CENTER
                }),
                new Paragraph({
                    text: 'про зайнятість випускників ХНЕУ ім. С. Кузнеця у грудні 2019 року ',
                    alignment: AlignmentType.CENTER
                }),
                new Paragraph({
                    text: 'за освітніми програмами факультету магістри 122, 126 (денної форми навчання)',
                    alignment: AlignmentType.CENTER
                }),

                educationsTable
            ]
        });

        const bufferedDoc = await Packer.toBuffer(doc);
        fs.writeFileSync(__dirname + "\\doc2.docx", bufferedDoc);
    }

    createStudentRow(student) {
        const rowCells = [];

        const cellsContent = Object.values(student);
        cellsContent.pop();

        cellsContent.forEach(content => {
            rowCells.push(new TableCell({
                children: [
                    new Paragraph({
                        text: content ? content.toString() : '',
                        alignment: AlignmentType.CENTER
                    })
                ],
                verticalAlign: VerticalAlign.CENTER
            }));
        });

        return new TableRow({
            children: rowCells
        });
    }
}

module.exports = {
    Docx
}