import { Router } from "express";
import { Business } from "../models/Business";
import { PendingBusiness } from "../models/PendingBusiness";
import { requireAdmin } from "./admin";

const router = Router();

// // GET all businesses
// router.get("/", async (_req, res) => {
//   const businesses = await Business.find();
//   res.json(businesses);
// });

// // POST new business
// router.post("/", async (req, res) => {
//   const { name, category, lat, lng, walletAddress, website } = req.body;
//   try {
//     const newBiz = new Business({ name, category, lat, lng, walletAddress, website });
//     await newBiz.save();
//     res.status(201).json(newBiz);
//   } catch (err) {
//     res.status(400).json({ error: "Error saving business" });
//   }
// });

// // Submit request (business inquiry)
// router.post("/inquiry", async (req, res) => {
//   const { name, category, lat, lng, walletAddress, website, acceptsUSDC } = req.body;
//   if (!acceptsUSDC) {
//     return res.status(400).json({ error: "Business must accept USDC to be listed." });
//   }
//   const newBiz = new PendingBusiness({ name, category, lat, lng, walletAddress, website, acceptsUSDC });
//   await newBiz.save();
//   res.status(201).json(newBiz);
// });

// // Admin approve
// router.post("/approve/:id", async (req, res) => {
//   const biz = await PendingBusiness.findById(req.params.id);
//   if (!biz) return res.status(404).json({ error: "Business not found" });

//   biz.status = "approved";
//   await biz.save();
//   res.json(biz);
// });

// GET approved businesses only (public map)
router.get("/", async (_req, res) => {
  try {
    const businesses = await Business.find({ status: "approved" });
    res.json(businesses);
  } catch (err: any) {
    console.error("Error fetching approved businesses:", err);
    res.status(500).json({
      error: "Failed to fetch approved businesses",
      details: err.message,
    });
  }
});


// GET businesses with filters, search, recommended, sort
router.get("/search", async (req, res) => {
  try {
    const { search, category, sort, lat, lng } = req.query;

    // Build query
    const query: any = { status: "approved" };

    if (category && category !== "All Categories") {
      query.category = category;
    }

    if (search) {
      const regex = new RegExp(search.toString(), "i");
      query.$or = [{ name: regex }, { description: regex }];
    }

    let businessesQuery = Business.find(query);

    // Let MongoDB handle sorting
    if (sort === "recent") {
      businessesQuery = businessesQuery.sort({ createdAt: -1 }); // newest first
    }

    let businesses = await businessesQuery.exec();

    // For "nearby" we still need JS because MongoDB geospatial isn’t set up yet
    if (sort === "nearby" && lat && lng) {
      const userLat = parseFloat(lat as string);
      const userLng = parseFloat(lng as string);

      const toRad = (x: number) => (x * Math.PI) / 180;
      const R = 6371; // Earth radius km

      const distance = (biz: any) => {
        const dLat = toRad(biz.lat - userLat);
        const dLng = toRad(biz.lng - userLng);
        const a =
          Math.sin(dLat / 2) ** 2 +
          Math.cos(toRad(userLat)) *
            Math.cos(toRad(biz.lat)) *
            Math.sin(dLng / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
      };

      businesses = businesses.sort((a, b) => distance(a) - distance(b));
    }

    res.json(businesses);
  } catch (err: any) {
    console.error("Error fetching businesses with search:", err);
    res.status(500).json({
      error: "Failed to fetch businesses",
      details: err.message,
    });
  }
});

// GET pending businesses (admin review)
router.get("/pending", requireAdmin, async (_req, res) => {
  try {
    const businesses = await Business.find({ status: "pending" });
    res.json(businesses);
  } catch (err: any) {
    console.error("Error fetching pending businesses:", err);
    res.status(500).json({
      error: "Failed to fetch pending businesses",
      details: err.message,
    });
  }
});


// POST new business (auto pending)
router.post("/", async (req, res) => {
  const {
    name,
    category,
    lat,
    lng,
    walletAddress,
    website,
    acceptsUSDC,
    description,
    contactEmail,
  } = req.body;

  try {
    const newBiz = new Business({
      name,
      category,
      lat,
      lng,
      walletAddress,
      website,
      acceptsUSDC,
      description,
      contactEmail,
      status: "pending",
    });

    await newBiz.save();
    res.status(201).json(newBiz);
  } catch (err: any) {
    console.error("Error saving business:", err);

    // If it's a Mongoose validation error, return the messages
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e: any) => e.message);
      return res.status(400).json({ error: "Validation failed", messages });
    }

    //return the generic error
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// PATCH approve/reject (admin only)
router.patch("/:id", requireAdmin, async (req, res) => {
  const { status } = req.body; // "approved" or "rejected"

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({
      error: "Invalid status",
      details: `Status must be either "approved" or "rejected". Received: ${status}`,
    });
  }

  try {
    const updated = await Business.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true } // runValidators ensures enum is enforced
    );

    if (!updated) {
      return res.status(404).json({
        error: "Business not found",
        details: `No business found with ID: ${req.params.id}`,
      });
    }

    res.json(updated);
  } catch (err: any) {
    console.error("Error updating business:", err);
    res.status(500).json({
      error: "Failed to update business",
      details: err.message,
    });
  }
});



export default router;
