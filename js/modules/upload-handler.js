/* ═══════════════════════════════════════════════════════
   upload-handler.js — Logo upload via click or drag-drop
   ═══════════════════════════════════════════════════════ */

let uploadedLogo = null;

/**
 * Initialize upload zone and file handling.
 * @param {object} callbacks — { onLogoLoaded(logoDataUrl), onLogoRemoved() }
 * @returns {object} — { getLogo, clearLogo }
 */
export function initUpload(callbacks) {
  const zone = document.getElementById('uploadZone');
  const fileInput = document.getElementById('logoUpload');
  const preview = document.getElementById('logoPreview');
  const thumb = document.getElementById('logoThumb');
  const removeBtn = document.getElementById('removeLogo');
  const logoSizeRow = document.getElementById('logoSizeRow');

  if (!zone || !fileInput) return { getLogo: () => null };

  zone.addEventListener('click', () => fileInput.click());

  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
    zone.classList.add('drag-over');
  });

  zone.addEventListener('dragleave', () => {
    zone.classList.remove('drag-over');
  });

  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) processFile(file);
  });

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) processFile(file);
  });

  if (removeBtn) {
    removeBtn.addEventListener('click', () => {
      uploadedLogo = null;
      preview.style.display = 'none';
      zone.style.display = 'flex';
      if (logoSizeRow) logoSizeRow.style.display = 'none';
      fileInput.value = '';
      callbacks.onLogoRemoved();
    });
  }

  function processFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      uploadedLogo = e.target.result;
      thumb.src = uploadedLogo;
      preview.style.display = 'flex';
      zone.style.display = 'none';
      if (logoSizeRow) logoSizeRow.style.display = 'flex';
      callbacks.onLogoLoaded(uploadedLogo);
    };
    reader.readAsDataURL(file);
  }

  return {
    getLogo: () => uploadedLogo,
    clearLogo: () => {
      uploadedLogo = null;
      preview.style.display = 'none';
      zone.style.display = 'flex';
      if (logoSizeRow) logoSizeRow.style.display = 'none';
      fileInput.value = '';
    }
  };
}
