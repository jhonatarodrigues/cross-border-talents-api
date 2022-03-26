import { Request } from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

// Configuração de armazenamento
const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback,
  ) {
    cb(null, './uploads/');
  },

  filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) => {
    // Extração da extensão do arquivo original:
    const extensaoArquivo = file.originalname.split('.')[1];

    // Cria um código randômico que será o nome do arquivo
    const novoNomeArquivo = 'teste';

    // Indica o novo nome do arquivo:
    cb(null, `${uuidv4()}.${extensaoArquivo}`);
  },
});

export default multer({ storage });
