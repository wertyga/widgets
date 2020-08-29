import shell from 'shelljs';
import path from 'path';
import { config } from '../../config/config';

// Пока не надо, для восстановления
export const deleteFolder = (folder) => {
  shell.rm('-rf', path.join(config.uploads.uploadPath))
};