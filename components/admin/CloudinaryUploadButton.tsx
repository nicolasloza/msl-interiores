'use client';

import { useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';

import type { GalleryImage } from '@/lib/data-access';

declare global {
  interface Window {
    cloudinary?: {
      openUploadWidget: (
        options: Record<string, unknown>,
        callback: (error: unknown, result: { event: string; info: { secure_url: string; public_id: string } }) => void
      ) => void;
    };
  }
}

type Props = {
  slug: string;
  onUpload: (images: GalleryImage[]) => void;
};

export default function CloudinaryUploadButton({ slug, onUpload }: Props) {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current || document.getElementById('cloudinary-widget-script')) {
      scriptLoaded.current = true;
      return;
    }
    const script = document.createElement('script');
    script.id = 'cloudinary-widget-script';
    script.src = 'https://upload-widget.cloudinary.com/global/all.js';
    script.async = true;
    script.onload = () => { scriptLoaded.current = true; };
    document.body.appendChild(script);
  }, []);

  function openWidget() {
    if (!window.cloudinary) {
      alert('El widget de Cloudinary todavía está cargando, intentá de nuevo en un segundo.');
      return;
    }

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      alert('Falta configurar NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME y NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET en .env.local');
      return;
    }

    const folder = slug
      ? `msl-interiores/proyectos/${slug}`
      : 'msl-interiores/proyectos';

    window.cloudinary.openUploadWidget(
      {
        cloudName,
        uploadPreset,
        folder,
        multiple: true,
        maxFiles: 30,
        sources: ['local', 'url', 'camera'],
        cropping: false,
        showSkipCropButton: false,
        language: 'es',
        text: {
          es: {
            or: 'o',
            back: 'Atrás',
            advanced: 'Avanzado',
            close: 'Cerrar',
            no_results: 'Sin resultados',
            search_placeholder: 'Buscar archivos',
            about_uw: 'Sobre el widget',
            menu: { files: 'Mis archivos', web: 'Dirección web', camera: 'Cámara' },
            selection_counter: { file: 'archivo', files: 'archivos' },
            actions: { upload: 'Subir', clear_all: 'Limpiar todo', log_out: 'Cerrar sesión' },
            notifications: { general_error: 'Ocurrió un error', general_prompt: '¿Estás seguro?', limit_reached: 'No podés seleccionar más archivos' },
            drag_and_drop: { title: 'Arrastrá tus archivos acá', title_single: 'Arrastrá tu archivo acá', subtitle: 'o', button_caption: 'Elegir archivo' },
            queue: { title: 'Cola de subida', title_uploading_with_counter: 'Subiendo {{num}} archivos', title_uploading: 'Subiendo archivos', upload_more: 'Subir más', done: 'Listo', mini_upload_count: '{{num}} subidos', mini_failed: '{{num}} fallidos', statuses: { uploading: 'Subiendo...', error: 'Error', uploaded: 'Subido', aborted: 'Cancelado' } },
          },
        },
        styles: {
          palette: {
            window: '#FDFAF5',
            windowBorder: '#D4C5A9',
            tabIcon: '#8B6F47',
            menuIcons: '#5C4A42',
            textDark: '#2C2420',
            textLight: '#FDFAF5',
            link: '#8B6F47',
            action: '#2C2420',
            inactiveTabIcon: '#8B6F47',
            error: '#8B2020',
            inProgress: '#8B6F47',
            complete: '#4A7B5C',
            sourceBg: '#F7F3ED',
          },
          fonts: {
            default: null,
            "'Inter', sans-serif": { url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap', active: true },
          },
        },
      },
      (error, result) => {
        if (error) return;
        if (result.event === 'success') {
          onUpload([{ url: result.info.secure_url, publicId: result.info.public_id }]);
        }
      }
    );
  }

  return (
    <Button
      variant="outlined"
      color="primary"
      onClick={openWidget}
      startIcon={<CloudUploadOutlinedIcon />}
      sx={{ flexShrink: 0 }}
    >
      Subir desde PC
    </Button>
  );
}
