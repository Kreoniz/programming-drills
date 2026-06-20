package drill

func ShippingBand(weightGrams int, expedited bool) string {
  if weightGrams <= 0 {
    return "invalid"
  }
  band := "freight"
  if weightGrams <= 100 {
    band = "letter"
  } else if weightGrams <= 1000 {
    band = "parcel"
  }
  if expedited {
    return band + "-express"
  }
  return band
}
