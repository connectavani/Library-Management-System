export const checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    const userPermissions = req.user?.permissions || [];

    const hasPermission = userPermissions.some(
      (perm) => perm.claimValue === requiredPermission
    );

    if (!hasPermission) {
      return res.status(403).json({ message: "Access Denied" });
    }

    next();
  };
};
