import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createSpotThunk } from "../../store/spots"
import { createSpotImageThunk } from "../../store/images"
import "./CreateSpotForm.css"

const CreateSpotForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [country, setCountry] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const lat = 0;
  const lng = 0;
  const [previewImage, setPreviewImage] = useState('')
  const [imageUrl1, setImageUrl1] = useState("")
  const [imageUrl2, setImageUrl2] = useState("")
  const [imageUrl3, setImageUrl3] = useState("")
  const [imageUrl4, setImageUrl4] = useState("")
  const [formErrors, setFormErrors] = useState({})
  const [hasSubmitted, setHasSubmitted] = useState(false)

  useEffect(() => {
    const errors = {}
    if (hasSubmitted) {
      if (!country) errors.country = 'Kingdom name is required'
      if (!address) errors.address = 'Castle address is required'
      if (!city) errors.city = 'Village is required'
      if (!state) errors.state = 'Region is required'
      if (!description || description.length < 30) errors.description = 'Scroll must be at least 30 runes long'
      if (!name) errors.name = 'Safe Zone name is required'
      if (!price) errors.price = 'Gold per night is required'
      if (!previewImage) errors.previewImage = 'You must enchant with at least one image'
      if (!imageUrl1 || !/\.jpg|\.jpeg|\.png$/i.test(imageUrl1)) errors.imageUrl1 = 'Image URL must end in .png .jpg or .jpeg'
      if (!imageUrl2 || !/\.jpg|\.jpeg|\.png$/i.test(imageUrl2)) errors.imageUrl2 = 'Image URL must end in .png .jpg or .jpeg'
      if (!imageUrl3 || !/\.jpg|\.jpeg|\.png$/i.test(imageUrl3)) errors.imageUrl3 = 'Image URL must end in .png .jpg or .jpeg'
      if (!imageUrl4 || !/\.jpg|\.jpeg|\.png$/i.test(imageUrl4)) errors.imageUrl4 = 'Image URL must end in .png .jpg or .jpeg'
      setFormErrors(errors)
    }
  }, [hasSubmitted, country, address, city, state, description, name, price, previewImage, imageUrl1, imageUrl2, imageUrl3, imageUrl4])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setHasSubmitted(true)
    if (Object.keys(formErrors).length > 0) return

    const spotData = {
      address, city, state, country, lat, lng, name, description, price
    }

    dispatch(createSpotThunk(spotData))
      .then((data) => {
        dispatch(createSpotImageThunk(data.id, { url: previewImage, preview: true }))
        if (imageUrl1) dispatch(createSpotImageThunk(data.id, { url: imageUrl1, preview: false }))
        if (imageUrl2) dispatch(createSpotImageThunk(data.id, { url: imageUrl2, preview: false }))
        if (imageUrl3) dispatch(createSpotImageThunk(data.id, { url: imageUrl3, preview: false }))
        if (imageUrl4) dispatch(createSpotImageThunk(data.id, { url: imageUrl4, preview: false }))
        return data
      })
      .then((data) => navigate(`/spots/${data.id}`))
  }

  return (
    <div className="create-spot-form-container">
      <h1 className="title">🧱 Summon a New Safe Zone</h1>
      <form onSubmit={handleSubmit} className="long-forms">

        <div className="form-section">
          <h2>📍 Realm & Location</h2>
          <p>Adventurers will uncover your coordinates only after booking.</p>
          <div className="form-group">
            <label>🏰 Kingdom</label>
            <input type="text" placeholder="e.g., Gondor" value={country} onChange={(e) => setCountry(e.target.value)} />
            {formErrors.country && <p className="error">{formErrors.country}</p>}
          </div>

          <div className="form-group">
            <label>🏯 Castle Address</label>
            <input type="text" placeholder="The old road near Misty Woods..." value={address} onChange={(e) => setAddress(e.target.value)} />
            {formErrors.address && <p className="error">{formErrors.address}</p>}
          </div>

          <div className="location">
            <div className="form-group">
              <label>🏘️ Village</label>
              <input className="cityInput" type="text" placeholder="Riverdale" value={city} onChange={(e) => setCity(e.target.value)} />
              {formErrors.city && <p className="error">{formErrors.city}</p>}
            </div>
            <div className="form-group">
              <label>🌄 Region</label>
              <input className="stateInput" type="text" placeholder="Northlands" value={state} onChange={(e) => setState(e.target.value)} />
              {formErrors.state && <p className="error">{formErrors.state}</p>}
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>📜 Description</h2>
          <p>Share the legend of your Safe Zone — maybe it's haunted, maybe it has dragons.</p>
          <textarea placeholder="Minimum 30 runes..." value={description} onChange={(e) => setDescription(e.target.value)} />
          {formErrors.description && <p className="error">{formErrors.description}</p>}
        </div>

        <div className="form-section">
          <h2>🧭 Give It a Name</h2>
          <p>Every great place has a legendary title.</p>
          <input type="text" placeholder="The Crimson Keep" value={name} onChange={(e) => setName(e.target.value)} />
          {formErrors.name && <p className="error">{formErrors.name}</p>}
        </div>

        <div className="form-section">
          <h2>💰 Tribute for Entry</h2>
          <p>Set the gold per night to rest at your Safe Zone.</p>
          <div className="price">
            <span>🪙</span>
            <input type="number" placeholder="Gold per night" value={price} onChange={(e) => setPrice(e.target.value)} />
            {formErrors.price && <p className="error">{formErrors.price}</p>}
          </div>
        </div>

        <div className="form-section">
          <h2>🖼️ Enchant with Images</h2>
          <p>Add a preview and gallery of your legendary lair.</p>
          <input type="text" placeholder="Preview Image URL" value={previewImage} onChange={(e) => setPreviewImage(e.target.value)} />
          {formErrors.previewImage && <p className="error">{formErrors.previewImage}</p>}

          <input type="text" placeholder="Side View" value={imageUrl1} onChange={(e) => setImageUrl1(e.target.value)} />
          {formErrors.imageUrl1 && <p className="error">{formErrors.imageUrl1}</p>}

          <input type="text" placeholder="Aerial View" value={imageUrl2} onChange={(e) => setImageUrl2(e.target.value)} />
          {formErrors.imageUrl2 && <p className="error">{formErrors.imageUrl2}</p>}

          <input type="text" placeholder="Throne Room" value={imageUrl3} onChange={(e) => setImageUrl3(e.target.value)} />
          {formErrors.imageUrl3 && <p className="error">{formErrors.imageUrl3}</p>}

          <input type="text" placeholder="Dungeon" value={imageUrl4} onChange={(e) => setImageUrl4(e.target.value)} />
          {formErrors.imageUrl4 && <p className="error">{formErrors.imageUrl4}</p>}
        </div>

        <button type="submit">✨ Summon Safe Zone</button>
      </form>
    </div>
  )
}

export default CreateSpotForm
