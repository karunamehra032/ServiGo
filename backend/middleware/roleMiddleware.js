/**
 * Role-based access control middleware.
 * Usage: roleCheck(['provider']) — only allows users with role 'provider'
 */

exports.roleCheck = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({
        message: 'Access denied. User role not found.',
        success: false,
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Only ${allowedRoles.join(' or ')} can perform this action.`,
        success: false,
      });
    }

    next();
  };
};
