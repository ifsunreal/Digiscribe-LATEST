import { adminAuth } from '../firebaseAdmin.js';

export async function verifyAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'No authentication token provided.' });
  }

  if (!adminAuth) {
    return res.status(503).json({ success: false, error: 'Firebase Admin SDK not initialized.' });
  }

  try {
    const token = authHeader.split('Bearer ')[1];
    const decoded = await adminAuth.verifyIdToken(token);
    // Normalize role from custom claims (support legacy admin boolean and old role names)
    if (!decoded.role) {
      decoded.role = decoded.admin ? 'admin' : 'user';
    } else if (decoded.role === 'superAdmin' || decoded.role === 'lguAdmin') {
      decoded.role = 'admin';
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Invalid or expired token.' });
  }
}

// Requires admin role
export async function verifyAdmin(req, res, next) {
  await verifyAuth(req, res, () => {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Admin access required.' });
    }
    next();
  });
}

// Backward-compatible aliases
export const verifySuperAdmin = verifyAdmin;
export const verifyAdminAny = verifyAdmin;
